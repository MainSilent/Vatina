import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Show
from .serializers import ShowSerializer

mux_token = settings.MUX_ACCESS_TOKEN
mux_secret_key = settings.MUX_SECRET_KEY
mux_auth = requests.auth.HTTPBasicAuth(mux_token, mux_secret_key)

class Show(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request):
        if request.user.show.count() >= 3:
            return Response({'message': { "show": "You can't have more than 3 shows" }}, status=400)

        data = { **request.data, 'owner': request.user.id }
        mux_create_payload = {
            "playback_policy": [
                "public"
            ],
            "new_asset_settings": {
                "playback_policy": [
                    "public"
                ]
            }
        }
        mux_response = requests.post("https://api.mux.com/video/v1/live-streams", json=mux_create_payload, auth=mux_auth)
        
        if mux_response.status_code != 201:
            return Response({'message': { "mux_api": "Failed to create live stream" }}, status=500)
        stream = mux_response.json()['data']
        data['stream_id'] = stream['id']
        data['stream_key'] = stream['stream_key']
        data['playback_id'] = stream['playback_ids'][0]['id']

        show_serializer = ShowSerializer(data=data)
        if show_serializer.is_valid():
            show = show_serializer.save()
            return Response({
                'id': show.id,
                'playback_id': show.playback_id,
                'stream_key': show.stream_key
            })

        return Response({'message': show_serializer.errors}, status=400)

    def delete(self, request, id):
        user = request.user
        show = user.show.filter(id=id).first()
        if show == None:
            return Response({'message': { "show": "Failed to find the live stream" }}, status=404)
        
        show.delete()
        return Response(status=204)
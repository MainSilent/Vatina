from show.views import Show 
from rest_framework import routers

router = routers.DefaultRouter()
router.register('show', Show)
from decouple import config, UndefinedValueError
import django_heroku

try:
    DEBUG = config('DEBUG', cast=bool)
except UndefinedValueError as e:
    quit(e)

if DEBUG:
    from .development import *
else:
    from .production import *

django_heroku.settings(locals())

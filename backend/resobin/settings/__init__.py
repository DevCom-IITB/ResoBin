from decouple import config, UndefinedValueError

try:
    DEBUG = config('DEBUG', cast=bool)
except UndefinedValueError as e:
    quit(e)

if DEBUG:
    from .development import *
else:
    from .production import *

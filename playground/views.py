from django.shortcuts import render
import logging
import requests

logger = logging.getLogger(__name__)

def say_hello(request):
    try:
        logger.info('Calling httpbin')
        response = requests.get('https://httpbin.org/delay/0.5')
        logger.info('Response received')
        data = response.json()
    except requests.ConnectionError:
        logger.critical('httpbin is offline')
    return render(request, 'hello.html', {"name": data})

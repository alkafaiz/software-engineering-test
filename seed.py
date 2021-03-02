from datetime import datetime
from datetime import timedelta
from random import randint

start = datetime.now()
end = start+timedelta(days=60)

for _ in range(10):
 value = randint(1, 10)

step = timedelta(hours=value)

result = []

while start < end:
    result.append(start.strftime('%Y-%m-%d %H:%M:%S'))
    start += step

print(result)
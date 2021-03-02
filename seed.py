from datetime import datetime
from datetime import timedelta
from random import randint

# datetime object containing current date and time
dt = datetime.now()
end = dt+timedelta(days=60)

# seed random number generator
for _ in range(10):
 value = randint(1, 10)
print(value)
step = timedelta(hours=value)



result = []

while dt < end:
    result.append(dt.strftime('%Y-%m-%d %H:%M:%S'))
    dt += step

print(result)
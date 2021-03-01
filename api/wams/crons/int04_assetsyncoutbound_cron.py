from datetime import datetime, timedelta
import requests
import pytz


def int04_assetsyncoutbound_cron():

    print('int04_assetsyncoutbound_cron')

    # get timezone
    timezone_ = pytz.timezone("Asia/Kuala_Lumpur")

    # datetime object containing current date and time
    now = datetime.now(timezone_)

    print("now =", now)

    # dd/mm/YY H:M:S
    from_date = now.strftime("%Y-%m-%dT%H:10:00+00:00")
    to_date = (now + timedelta(hours=1)).strftime("%Y-%m-%dT%H:09:59+00:00")

    payload = {
        "service_name": "getAssetSyncOutbound",
        "from_date": from_date,
        "to_date": to_date
    }

    r = requests.post(
        "https://airsel-rfid-api.pipe.my/v1/wams/services/", json=payload)

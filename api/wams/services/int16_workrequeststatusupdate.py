from requests import Session
from requests.auth import HTTPBasicAuth

import json
import requests
import xmltodict


def get_workrequeststatusupdate(from_date, to_date):

    payload = {
        "from_date": from_date,
        "to_date": to_date,
    }

    r = requests.post("http://174.138.28.157/getWorkRequestStatusUpdate.php", data = payload)    

    return json.loads(r.content)

    # wsdl = "https://pasb-dev-uwa-iws.oracleindustry.com/ouaf/webservices/CM-CM-WORKREQUEST?WSDL"
    # session = Session()
    # session.auth = HTTPBasicAuth("RFID_INTEGRATION", "Rfid_1nt")

    # client = Client(wsdl, transport=Transport(session=session),
    #                 settings=Settings(strict=False, raw_response=True))

    # response = client.service.ExtractWorkRequest()
    # response_xml = response.content
    # # print(response_xml)
    # middleware_response_json = json.loads(
    #     json.dumps(xmltodict.parse(response_xml)))
    # return middleware_response_json['env:Envelope']['env:Body']['ouaf:ExtractWorkRequest']['ouaf:results']

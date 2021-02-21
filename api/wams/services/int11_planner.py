from requests import Session
from requests.auth import HTTPBasicAuth

import json
import requests
import xmltodict


def get_planner(from_date, to_date):

    payload = {
        "from_date": from_date,
        "to_date": to_date
    };

    r = requests.post("http://139.59.125.201/getPlanner.php", data = payload)
    return json.loads(r.content);

    # wsdl = "https://pasb-dev-uwa-iws.oracleindustry.com/ouaf/webservices/CM-PLANNER?WSDL"
    # session = Session()
    # session.auth = HTTPBasicAuth("RFID_INTEGRATION", "Rfid_1nt")

    # client = Client(wsdl, transport=Transport(session=session),
    #                 settings=Settings(strict=False, raw_response=True))

    # request_data = {
    #     'FROM_DATE': '2020-10-11T00:00:00.000+08:00',
    #     'TO_DATE': '2020-10-13T00:00:00.000+08:00'
    # }

    # response = client.service.ExtractPlanner(**request_data)
    # response_xml = response.content
    # # print(response_xml)
    # middleware_response_json = json.loads(
    #     json.dumps(xmltodict.parse(response_xml)))
    # return middleware_response_json['env:Envelope']['env:Body']['ouaf:ExtractPlanner']['ouaf:results']

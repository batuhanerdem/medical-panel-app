import { parseStringPromise } from 'xml2js';

verifyTc = async (patient) => {
  return 'true'
  const soapMessage = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tckimlik.nvi.gov.tr/WS">
    <soapenv:Header/>
    <soapenv:Body>
      <ser:TCKimlikNoDogrula>
        <ser:TCKimlikNo>${patient.tc}</ser:TCKimlikNo>
        <ser:Ad>${patient.name}</ser:Ad>
        <ser:Soyad>${patient.surname}</ser:Soyad>
        <ser:DogumYili>${patient.birthYear}</ser:DogumYili>
      </ser:TCKimlikNoDogrula>
    </soapenv:Body>
  </soapenv:Envelope>`;

  const response = await fetch('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml'
    },
    body: soapMessage
  });
  const data = await response.text();
  const parsedResponse = await parseStringPromise(data, { explicitArray: false });

  const result = parsedResponse['soap:Envelope']['soap:Body']['TCKimlikNoDogrulaResponse']['TCKimlikNoDogrulaResult']
  return result
}


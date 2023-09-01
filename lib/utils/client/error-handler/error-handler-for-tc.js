import { Report } from 'notiflix/build/notiflix-report-aio';

errorForTc = (error) => {
    let errorMessage, errorTitle

    switch (error.error) {
        case "schema-error":
            errorTitle = "Gecersiz Tc"
            errorMessage = "Lutfen kurallara uygun bir TC kimlik no giriniz"
            break;
        default:
            errorTitle = error.error
            errorMessage = error.reason
            break;
    }

    Report.failure(
        errorTitle,
        errorMessage,
        'Tamam',
    );
}
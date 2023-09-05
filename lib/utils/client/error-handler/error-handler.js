import { Report } from 'notiflix/build/notiflix-report-aio';

errorHandler = (error) => {
    let errorMessage, errorTitle
    switch (error?.error) {
        case "schema-error":
            errorTitle = "Gecersiz sema"
            errorMessage = "Lutfen formu kontrol edin"
            break;
        default:
            errorTitle = error.reason
            errorMessage = error.reason
            break;
    }

    Report.failure(
        errorTitle,
        errorMessage,
        'Tamam',
    );
}
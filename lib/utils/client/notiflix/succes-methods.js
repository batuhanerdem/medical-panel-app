import { Report } from 'notiflix/build/notiflix-report-aio';

succesfullyRegistered = ({ patient, doctorName }) => {
    Report.success(
        'Basari ile siraya girildi',
        `${patient.name} isimli hasta ${doctorName} isimli doktor icin siraya girdi`,
        'Tamam',
    );
}

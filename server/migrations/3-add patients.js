Migrations.add({
    version: 3,
    name: 'Add patients',
    up: function () {
        const patients = JSON.parse(Assets.getText('seeds/patients.json'))
        patients.forEach(patients => {
            Patients.insert(patients)
        });
    },
    down: function () {
        Patients.remove({})
    }
});
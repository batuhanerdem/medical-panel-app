import SimpleSchema from 'simpl-schema'

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("doctorId").validator(),
    async run(patient) {
        console.log(Deneme);
        if (!this.userId) {
            throw new Meteor.Error('Login error',
                'Doktor login ol.');
        }
        patient.doctorId = this.userId
        await sleep(10000)
        return null
        // return Patients.insert(patient)
    }
});
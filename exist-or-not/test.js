const check = async () => {
    const { handler } = await import('./index.js');
    const event = {        
        full_name: 'Alice Brown', // Replace with actual full name
        phone_number: '123-456-7890' // Replace with actual phone number
    };
    const result = await handler(event);
    console.log(result);
}
const create = async () => {
    const { handler } = await import('./index.js');
    const event = {        
        doctor_name: 'Dr. Jane Doe', // Replace with actual doctor name
        date: '2022-12-31', // Replace with actual date
        time: '12:00', // Replace with actual time
        patient_name: 'Alice Brown', // Replace with actual patient name
        phone_number: '123-456-7890' // Replace with actual phone number
    };
    const result = await handler(event);
    console.log(result);
}

check();
create();
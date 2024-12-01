const check = async () => {
    const { handler } = await import('./index.js');
    const event = {        
        full_name: 'Alice Brown', // Replace with actual full name
        phone_number: '123-456-7890' // Replace with actual phone number
    };
    const result = await handler(event);
    console.log(result);
}
check();

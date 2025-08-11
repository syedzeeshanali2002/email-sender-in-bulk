function sendEmails() {
    const emails = document.getElementById('emails').value.split(',').map(e => e.trim());
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    document.getElementById('status').innerText = "Sending...";

    fetch('/send-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails, subject, message })
    })
    .then(res => res.text())
    .then(response => {
        document.getElementById('status').innerText = response;
    })
    .catch(err => {
        document.getElementById('status').innerText = "Error sending emails.";
        console.error(err);
    });
}

const messageForm = document.getElementById('message-form');
const webhookUrlInput = document.getElementById('webhook-url');
const imageUrlInput = document.getElementById('image-url');
const webhookNameInput = document.getElementById('webhook-name');
const messageInput = document.getElementById('message');
const footerInput = document.getElementById('footer-message');
const footerUrlInput = document.getElementById('footer-url');

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
    event.preventDefault();
  }
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const webhookUrl = webhookUrlInput.value;
  const imageUrl = imageUrlInput.value;
  const message = messageInput.value;
  const webhookName = webhookNameInput.value || "Inaa#0001";

  const payload = {
    username: webhookName,
    avatar_url: imageUrl,
    content: message
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.text())
    .then(result => {
      if (result === "") {
        const timeString = new Date().toLocaleTimeString();
        document.getElementById('result').textContent += `Successfully sent message. [${timeString}]\n`;
      } else {
        document.getElementById('result').textContent += `${result}\n`;
      }
    })
    .catch(error => console.error('Error:', error));
});

const embedForm = document.getElementById('embed-form');
const embedTitleInput = document.getElementById('embed-title');
const embedDescriptionInput = document.getElementById('embed-description');
const embedColorInput = document.getElementById('embed-color');

embedForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const webhookUrl = webhookUrlInput.value;
  const imageUrl = imageUrlInput.value;
  const embedTitle = embedTitleInput.value;
  const embedDescription = embedDescriptionInput.value;
  const embedColor = embedColorInput.value;
  const webhookName = webhookNameInput.value || "Inaa#0001";

  const footerMessage = footerInput.value;
  const footerUrl = footerUrlInput.value;

  const payload = {
    username: webhookName,
    avatar_url: imageUrl,
    embeds: [{
      title: embedTitle,
      description: embedDescription,
      color: parseInt(embedColor.replace('#', ''), 16),
      footer: {
        text: footerMessage,
        icon_url: footerUrl
      }
    }]
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.text())
    .then(result => {
      if (result === "") {
        const timeString = new Date().toLocaleTimeString();
        document.getElementById('result').textContent += `Successfully sent message. [${timeString}]\n`;
      } else {
        document.getElementById('result').textContent += `${result}\n`;
      }
    })
    .catch(error => console.error('Error:', error));
});
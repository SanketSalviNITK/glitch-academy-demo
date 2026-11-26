const form = document.querySelector('#chat-form');
const input = document.querySelector('#chat-input');
const log = document.querySelector('#chat-log');

const intents = [
  { name: 'projects', pattern: /\b(projects?|portfolio|built|work)\b/i, reply: 'I built a weather app, a 3D portfolio and this chatbot.' },
  { name: 'skills',   pattern: /\b(skills?|languages?|stack)\b/i,       reply: 'HTML, CSS, JavaScript and Three.js.' },
  { name: 'contact',  pattern: /\b(contact|email|reach|hire)\b/i,       reply: 'Email me at demo@example.com.' },
  { name: 'greeting', pattern: /\b(hi|hello|hey)\b/i,                   reply: 'Hi! Ask me about my projects, skills or contact.' },
];

function reply(message) {
  for (const intent of intents) {
    if (intent.pattern.test(message)) return intent.reply;
  }
  return "Sorry, I didn't get that. Try asking about projects, skills or contact.";
}

function addMessage(who, text) {
  const p = document.createElement('p');
  p.className = who;
  p.textContent = text;
  log.append(p);
  log.scrollTop = log.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage('user', text);
  input.value = '';
  setTimeout(() => addMessage('bot', reply(text)), 600);
});

// Объект для хранения контактов
let contacts = [];

// Функция отображения контактов
function renderContacts(filteredContacts = contacts) {
  const contactList = document.getElementById("contacts_body");
  contactList.innerHTML = "";

  // Сортировка сначала по избранным, потом по имени
  filteredContacts.sort((a, b) => {
    if (a.favorite === b.favorite) {
      return a.name.localeCompare(b.name);
    }
    return a.favorite ? -1 : 1; // Избранные контакты показываются первыми
  });

  filteredContacts.forEach((contact) => {
    const card = document.createElement("div");
    card.className = "card" + (contact.favorite ? " favorite" : "");
    card.innerHTML = ` 
      <img class="card_icon" src="img/user.png" alt="">
      <div class="card_leftblock horizontal">
        <div class="card_name">${contact.name}</div>
        <div class="card_phone">${contact.phone}</div>
      </div>
      <div class="card_rightblock horizontal">
        <a class="card_delete_icon" onclick="deleteContact('${contact.id}')">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
        </a>
        <a class="card_favorite_icon" onclick="toggleFavorite('${contact.id}')">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
            </svg>
        </a>
      </div>
    `;
    contactList.appendChild(card);
  });
}

// Функция добавления нового контакта
function addContact() {
  const name = document.getElementById("newname").value.trim();
  const phone = document.getElementById("newnumber").value.trim();
  const favorite = document.getElementById("addtofav").checked;

  if (name && phone) {
    const id = Date.now(); // Уникальный идентификатор на основе времени
    contacts.push({ id, name, phone, favorite });
    renderContacts();
    // Очистка полей ввода
    document.getElementById("newname").value = '';
    document.getElementById("newnumber").value = '';
    document.getElementById("addtofav").checked = false;
  } else {
    alert("Имя и номер телефона обязательны!"); // Валидация
  }
}

// Удаление контакта
function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== Number(id));
  renderContacts();
}

// Добавление в избранное
function toggleFavorite(id) {
  const contact = contacts.find((contact) => contact.id === Number(id));
  if (contact) {
    contact.favorite = !contact.favorite;
    renderContacts();
  }
}

// Поиск контактов
document.getElementById("search_input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query)
  );
  renderContacts(filteredContacts);
});

import { handleMessageDelete, toggleEditMode } from "../index.js";

export function createMessageList(data, user, editMode) {
  const messageList = $("<ul class='message'></ul>");
  data.forEach((doc) => {
    doc.data();
    let li = $(
      `<li id="${doc.id}" class="message-item"><div><i class="message-item_author" style='color:${doc.data().color}'>${doc.data().authorName
      }</i><p class="message-item_text">${doc.data().message}</p></div></li>`
    );

    if (user?.uid === doc.data().userid) {
      li.addClass("author");
      let editButton = $("<button class='btn primary'>Edit</button>");
      editButton.on("click", () => toggleEditMode(doc.id, doc.data().message));
      let deleteButton = $("<button class='btn delete'>Delete</button>");
      deleteButton.on("click", () => handleMessageDelete(doc.id));
      let actions = $("<div class='message-buttons'></div>");
      if (!editMode) {
        actions.append(editButton, deleteButton);
      }
      li.append(actions);
    }
    messageList.append(li);
  });
  return messageList;
}

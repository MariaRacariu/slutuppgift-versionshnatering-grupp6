import { toggleEditMode } from "../index.js";

export function createMessageForm(
  handleMessageCreation,
  handleMessageUpdate,
  editMode,
  doc
) {
  const form = $("<form class='message-form'></form>");

  if (editMode) {
    form.addClass("edit");
  }

  if (editMode) {
    form.on("submit", handleMessageUpdate);
  } else {
    form.on("submit", handleMessageCreation);
  }

  let textarea = $(
    "<textarea id='messageTextArea' placeholder='Enter your message' class='message-input'></textarea><input type='color' value='#000000' id='colorPick'>"
  );

  if (editMode) {
    textarea.html(doc?.message);
  }

  let cancelButton = $("<button class='btn primary'>Cancel</button>");
  cancelButton.on("click", toggleEditMode);

  form.append(
    textarea,
    `<button type='submit' class="btn button">${editMode ? "Save" : "Send"}</button>`,
    editMode && cancelButton
  );
  return form;
}

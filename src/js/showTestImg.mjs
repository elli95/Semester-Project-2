/**
 * Displays image from input value in list form.
 */
function ShowTestImage() {
  document.getElementById("edit-img-display").src = this.value;
  document.getElementById("edit-img-display").style.display = "flex";
}

export { ShowTestImage };

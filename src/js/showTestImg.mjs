function ShowTestImage() {
  console.log(this.value);
  document.getElementById("edit-img-display").src = this.value;
  document.getElementById("edit-img-display").style.display = "flex";
  //   document.getElementById("edit-img-display").src = this.value;
  //   document.getElementById("edit-img-display").style.display = "flex";
}

export { ShowTestImage };

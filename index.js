//https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-03/puppy-dog-mc-230321-03-b700d4.jpg



let formElement = document.querySelector(".build-form");
formElement.addEventListener('submit', generateMeme);

function deleteMeme(evt){
  let memeContainer = evt.target.parentNode;

  //console.log(memeContainer.querySelectorAll('*')); //original idea was forEach with this.
  while (memeContainer.firstChild){
    memeContainer.removeChild(memeContainer.firstChild);
  }
  memeContainer.remove();
}

function generateMeme(evt){
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const formObj = Object.fromEntries(formData);


  if (formObj['image-url'].length < 4){
    console.log('need an image sir.');
  } else {
    let memeContainer = document.createElement('div');
    memeContainer.classList.add('meme-container');

    let allMemes = document.querySelector('.all-memes');
    allMemes.appendChild(memeContainer);

    let memeImage = document.createElement('img');
    memeImage.classList.add('meme-image');
    memeImage.setAttribute('src', formObj['image-url']);
    memeContainer.appendChild(memeImage);


    //Below has some trickiness. We need imgHeight for bottom text, but
    //we can't grab image height until it's been resized to fill container.
    //So we append first, then wait for it to load. After that we can use
    //clientHeight to get imageHeight once it's displayed through the DOM.

    memeImage.addEventListener('load', addRest);

    function addRest(evt) {
      //Should still have access to formObj
      let topText = document.createElement('p');
      topText.classList.add('top-text');
      topText.textContent = formObj['top-text-input'];

      let bottomText = document.createElement('p');
      bottomText.classList.add('bottom-text');
      bottomText.textContent = formObj['bottom-text-input'];

      //containers will grow to fit tallest, so we have to go from top, instead of bottom.
      let imgHeight = memeImage.clientHeight;
      console.log('img height is: ', imgHeight);
      bottomText.style.top = "" + (imgHeight - 60) + 'px';

      let deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-meme');
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.top = "" + (imgHeight) + 'px';
      deleteBtn.addEventListener('click', deleteMeme);

      //Add rest to container.
      memeContainer.appendChild(topText);
      memeContainer.appendChild(bottomText);
      memeContainer.appendChild(deleteBtn);

      //When all done, clear form fields.
      let myForm = document.querySelector('form');
      myForm.reset();
    }
  }

}

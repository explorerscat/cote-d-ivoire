let allLangs = ['fr', 'en', 'pr'];

HTMLElement.prototype.hide = function() {
  this.classList.add('hidden');
}

HTMLElement.prototype.show = function() {
  this.classList.remove('hidden');
}

function ChangeLangVisibility(lang, show) {
  let selector = 'p[lang="' + lang + '"]';
  document.querySelectorAll(selector).forEach(p => {
    if (show) {
      p.show();
    } else {
      p.hide();
    }
  });
}

function ShowClickedLang(lang) {
  ChangeLangVisibility(lang, true);
  for (let i = 0; i < allLangs.length; i++) {
    let hideLang = allLangs[i];
    if (hideLang == lang) {
      continue;
    }
    ChangeLangVisibility(hideLang, false);
  }
}

function showQuestion(num) {
  document.querySelectorAll('div.question').forEach(div => {
    div.hide();
  });
  document.getElementById('q' + num).show();
}

document.getElementById('button-en').onclick = function() {
  ShowClickedLang('en');
};

document.getElementById('button-fr').onclick = () => {
 ShowClickedLang('fr');
};

document.getElementById('button-pr').onclick = function() {
  ShowClickedLang('pr');
};

document.querySelectorAll('.start-button').forEach(button => {
  button.onclick = function() {
    showQuestion(1);
    this.hide();
  };
});

document.querySelectorAll('.question button').forEach(button => {
  button.onclick = function() {
    let questionEl = button.parentElement.parentElement;
    let questionNum = questionEl.id.slice(1);
    if (button.classList.contains('is-correct')) {
      button.classList.add('answer-correct');
      window.setTimeout(() => {
        questionEl.hide();
        showQuestion(parseInt(questionNum) + 1);
      }, 1000);
    } else if (button.classList.contains('bakana')) {
      button.classList.add('answer-incorrect');
      console.log("What is wrong with you?")
    } else {
      button.classList.add('answer-incorrect');
      
    }
  };
});

document.getElementById('imgmap').onclick = function() {
  showQuestion(2);
};

document.querySelectorAll('.cont-button-1').forEach(button => {
  button.onclick = function() {
    showQuestion(4);
  };
});

document.querySelectorAll('.crop-select').forEach(button => {
  button.onclick = function() {
    if (button.classList.contains('is-correct-crop')) {
      document.getElementById('crops').hide();
      document.querySelectorAll('.hidden-text-win').forEach(p => {
        p.show();
        window.setTimeout(() => {
          showQuestion(6);}, 2000
        );
      });
    } else {
      if (button.classList.contains('isnt-correct-crop')) {
        document.getElementById('crops').hide();
        document.querySelectorAll('.hidden-text-lose').forEach(p => {
          p.show();
          window.setTimeout(() => {
            showQuestion(6);}, 2000
          );
        });
      }
    } 
  };
});


const yesNoTranslations = {
  'en': {
    'yes': /yes/i,
    'no': /no/i
  },
  'fr': {
    'yes': /oui/i,
    'no': /non/i
  },
  'pr': {
    'yes': /yea/i,
    'no': /nay/i
  }
};

function checkInput(lang, input) {
  const translations = yesNoTranslations[lang];
  if (translations.yes.test(input)) {
    return 'yes';
  } else if (translations.no.test(input)) {
    return 'no';
  } else {
    return 'unknown';
  }
};

const inputFarmElements = document.querySelectorAll('.input-farm input');
inputFarmElements.forEach(input => {
  input.addEventListener('change', function() {
    const lang = input.parentElement.lang; 
    const userAnswer = this.value;
    const result = checkInput(lang, userAnswer);
    if (result === 'yes') {
      showQuestion(5);
    } else if (result === 'no') {
      showQuestion(6);
    } else {
      if (lang == 'en') {
        alert('Please enter "yes" or "no".');
      }
      if (lang == 'fr') {
        alert('Veuillez entrer "oui" ou "non".');
      }
      if (lang == 'pr') {
        alert('Enter "yea" or "nay" ye bastard!');
      }
    }
  });
});

document.querySelectorAll('.cont-button-2').forEach(button => {
  button.onclick = function() {
    showQuestion(7);
  };
});

document.querySelectorAll('.finish-button').forEach(button => {
  button.onclick = function() {
    showQuestion(8);
    this.hide();
  };
});

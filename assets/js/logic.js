var searchBtnEl = document.getElementById("search-btn");
var searchInputEl = document.getElementById("search-input");
var filterBtnEl = document.getElementById("filter-btn");
var formEl = document.getElementById("movie-form");
var filterModalEl = document.getElementById("filter-modal");
var modalCloseBtn = document.getElementById("modal-cancel-btn");
var pageEl = document.querySelector("html");
var preferences = {};
var alertModalEl = document.getElementById("alert-modal");


var startSearch = function(event) {
    // console.log(searchInputEl.value.trim());
    event.preventDefault();

    // get input from user and store it in movieTitle
    var movieTitle = searchInputEl.value.trim();
    // console.log("searching");

    // if the user input something -not blank- call APIs
    if (movieTitle) {
        // call functions to fetch from APIs based on movieTitle
    // else alert user to input something
    } else {
        // start modal
        // alert("Please enter a movie name");
        alertModalEl.classList.add("is-active");
        pageEl.classList.add("is-clipped");
    }
};

var callModal = function(event) {
    // console.log("filtering");
    filterModalEl.classList.add("is-active");
    pageEl.classList.add("is-clipped");

};

var inputHandler = function(event) {
    event.preventDefault();
    // console.log(event.target.id);
    var inputId = event.target.id;

    if (inputId === "search-btn") {
        // console.log("searching");
        startSearch();
    // } else if (inputId === "filter-btn") {
    //     // console.log("filtering");
    //     callModal();
    }

};


var loadPreferences = function() {
    preferences = JSON.parse(localStorage.getItem("search-preference"));
    // console.log(preferences);

    if (!preferences) {
        preferences = {};
        savePreferences();
    }
    var cbPreferenceArr = document.querySelectorAll(".filter-option");

    for (var i = 0; i < cbPreferenceArr.length; i++) {
        // console.log(cbPreferenceArr[i].getAttribute("name"));
        if (preferences[cbPreferenceArr[i].getAttribute("name")] === true) {
            // console.log(cbPreferenceArr[i]);
            cbPreferenceArr[i].checked = true;
        } else {
            cbPreferenceArr[i].checked = false;
        }
    }

};

var savePreferences = function() {
    // select all checkboxes
    var cbPreferenceArr = document.querySelectorAll(".filter-option");
    // console.dir(cbPreferenceArr[0]);
    //loop through all of them
    for (var i = 0; i < cbPreferenceArr.length; i++) {
        // in loop, retrieve name and status
        var preferenceName = cbPreferenceArr[i].getAttribute("name");
        var preferenceState = cbPreferenceArr[i].checked;
        // console.log(preferenceName, preferenceState);
        // push to preference object
        preferences[preferenceName] = preferenceState;
    }
    // console.log(preferences);
    // save to local storage
    localStorage.setItem("search-preference", JSON.stringify(preferences));
};
// disabling for now
//formEl.addEventListener("click", inputHandler);

searchBtnEl.addEventListener("click", startSearch);

// modalCloseBtn.addEventListener("click", closeModal);

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
      loadPreferences();
    }
    
    function closeModal($el) {
        $el.classList.remove('is-active');
        // add scrollbar back to main HTML
        pageEl.className = "";
        // save filter preferences
        // savePreferences();
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        event.preventDefault();
          openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
        $close.addEventListener('click', (event) => {
            if (event.target.id === "modal-save-btn") {
                // console.log("saving");
                savePreferences();
            }
            closeModal($target);
        });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });

  // load from localStorage
  loadPreferences();
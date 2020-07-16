docReady(function () {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var title_name = url.searchParams.get("name");
  document.title = title_name + " Thread";

  var id = url.searchParams.get("id");
  fetch('api/v1/threads/' + id).then((res) => res.json()).then((data) => {
    var container = document.getElementById("thread-body");
    if (data.message != "Success") {
      return;
    }
    var thread = data.thread;
    html = `<div class="thread-container row no-gutters">
        <div class=" col-lg-2 col-sm-6 order-lg-1 order-1 alert alert-success">
          <div class="">`+ thread.creator_name + `</div>
        </div>
        <div class=" col-lg-8 order-lg-2 col-md-12 order-3 alert alert-success"><div><h5>`+thread.name+`</h5></div><div class="text-body-wrap">`
      + thread.text +
      `</div></div>
        <div class=" col-lg-2 col-sm-6 order-lg-3 order-2 alert alert-success">`+ getTime(thread.date_created * 1000) + `<br>`
      + getDate(thread.date_created * 1000) + `
        </div>
      </div>`
    var temp = document.createElement('div');
    temp.innerHTML = html;
    container.appendChild(temp);
  });
  fetch("api/v1/comments/list/" + id).then((res) => res.json()).then((data) => {
    if (data.message != "Success") {
      var el = document.getElementById("not_auth");
      el.classList.remove("d-none");
    } else {
      var container = document.getElementById("comment-list");
      var comments = data.comments;
      for (var i = 0; i < comments.length; i++) {
        var html = getCommentHtml(comments[i]);
        var temp = document.createElement('div');
        temp.innerHTML = html;
        container.appendChild(temp);
      }
    }
  });


});

function getTime(date) {
  var d = new Date(date);
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  return hours + ":" + minutes+ampm;
}
function getDate(date) {
  var d = new Date(date);
  return (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
}

function create_Comment() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("id");
  var value = document.getElementById("text-comment").value;
  var comment = {
    text: value,
    thread_id: id,
  }
  fetch("/api/v1/comments/create", {
    method: "POST",
    headers: {
      'Content-type': "application/json"
    },

    body: JSON.stringify(comment)
  }).then(res => res.json()).then(data => {
    if (data.message == "Success") {
      var user = JSON.parse(localStorage.getItem("user"));
      comment.creator_name = user.name;
      comment.date_created = new Date().getTime() / 1000;
      var html = getCommentHtml(comment);
      var container = document.getElementById("comment-list");
      var temp = document.createElement('div');
      temp.innerHTML = html;
      container.appendChild(temp);
      document.getElementById("text-comment").value = "";
    }
  })
}

function getCommentHtml(comment) {
  return `<div class="thread-container row no-gutters">
                <div class=" col-lg-2 col-sm-6 order-lg-1 order-1 alert alert-warning">
                  <div class="">`+ comment.creator_name + `</div>
                </div>
                <div class=" col-lg-8 order-lg-2 col-md-12 order-3 alert alert-warning"><div class="text-body-wrap">`
    + comment.text +
    `</div></div>
                <div class=" col-lg-2 col-sm-6 order-lg-3 order-2 alert alert-warning">`+ getTime(comment.date_created * 1000) + `<br>`
    + getDate(comment.date_created * 1000) + `
                </div>
              </div>`;
}
docReady(function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var title_name = url.searchParams.get("name");
    document.title = title_name + " Forum";

    var id = url.searchParams.get("id");
    fetch("api/v1/threads/list/" + id).then((res) => res.json()).then((data) => {
        if (data.message != "Success") {
            var el = document.getElementById("not_auth");
            el.classList.remove("d-none");
        } else {
            var container = document.getElementById("forum-list");
            var threads = data.threads;
            for (var i = 0; i < threads.length; i++) {
                var html = getThreadHtml(threads[i]);
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

function createThread() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var thread_input = document.getElementById("thread-name-input").value;
    var value = document.getElementById("thread-text").value;
    var thread = {
        text: value,
        name: thread_input,
        forum_id: id,
    }
    fetch("/api/v1/threads/create", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },

        body: JSON.stringify(thread)
    }).then(res => res.json()).then(data => {
        if (data.message == "Success") {
            var user = JSON.parse(localStorage.getItem("user"));
            thread.creator_name = user.name;
            thread.date_created = new Date().getTime() / 1000;
            var html = getThreadHtml(thread);
            var container = document.getElementById("forum-list");
            var temp = document.createElement('div');
            temp.innerHTML = html;
            container.appendChild(temp);container.insertBefore(temp, container.childNodes[0]);
            document.getElementById("thread-text").value = "";
            document.getElementById("thread-name-input").value = "";
        }
    })

}

function getThreadHtml(thread){
    var msg = thread.last_updated ? "Updated: " : "Created: ";
    var d= thread.last_updated ? thread.last_updated : thread.date_created;
   return  `<div class="thread-container row no-gutters">
    <div class=" col-lg-2 col-sm-6 order-lg-1 order-1 alert alert-success">
      <div class="">`+ thread.creator_name + `</div>
    </div>
    <div class=" col-lg-8 order-lg-2 col-md-12 order-3 alert alert-success" title="`+ thread.text.substr(0, 140) + `">
      <a href="ThreadPage.html?id=`+ thread.id + `&name=` + encodeURI(thread.name) + `">` + thread.name + `</a>
    </div>
    <div class=" col-lg-2 col-sm-6 order-lg-3 order-2 alert alert-success"><div class="">`+ msg+ getTime(d * 1000) + `<br>`
        + getDate(d * 1000) + `
    </div></div>
  </div>`
}
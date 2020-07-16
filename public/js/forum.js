var branchesmap = [];
branchesmap["/GeneralForum.html"]=  1;
branchesmap["/STEMforum.html"]=  2;
branchesmap["/BusinessForum.html"]=  3;
branchesmap["/LiberalArts.html"]=  4;

docReady(function() {
    var branch_id = branchesmap[window.location.pathname];
    fetch("api/v1/forums/list/"+ branch_id).then((res)=>res.json()).then((data)=>{
        if(data.message!="Success"){
            var el = document.getElementById("not_auth");
            el.classList.remove("d-none");
        }else{
            var container = document.getElementById("forum-list");
            var forums = data.forums;
            for(var i = 0; i<forums.length;i++){
                var html = `<div class = 'forum-name-container'>
                <h4> <a href = "/ForumPage.html?id=`+ forums[i].id+"&name="+encodeURI(forums[i].name)+`">`+
                forums[i].name +
            `</a>
            </h4>
            </div>`;
            var temp = document.createElement('div'); 
            temp.innerHTML = html;



                container.appendChild(temp);
            }
        }
    })
});
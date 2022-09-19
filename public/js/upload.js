document.getElementById("imageUpload").onclick = function () {
  console.log("first");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    document.getElementById("imageStatus").innerHTML = this.responseText;
  };
  xhttp.open("POST", "/dashboard/image-upload");
  xhttp.upload.onprogress=function(e){
    if (e.lengthComputable) {
        let res=Math.floor((e.loaded/e.total)*100)
        if (res!==100) {
            document.getElementById("progress-bar").innerHTML=res+"%"
            document.getElementById("progress-bar").style="width:"+res+"%"


        } else {
            document.getElementById("progressDiv").style="display:none"

        }

    } 
  }
  let formData = new FormData();
  if (document.getElementById("selectedImage").files.length > 0) {
    document.getElementById("progressDiv").style="display:block"

    formData.append("image", document.getElementById("selectedImage").files[0]);
    xhttp.send(formData);
  } else {
    document.getElementById("imageStatus").innerHTML = "خالیه";
  }
};

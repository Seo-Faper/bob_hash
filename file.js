(function() {
        
    var $file = document.getElementById("f1")
    var dropZone = document.querySelector(".drop-zone")

    var toggleClass = function(className) {
        
        console.log("current event: " + className)

        var list = ["dragenter", "dragleave", "dragover", "drop"]

        for (var i = 0; i < list.length; i++) {
            if (className === list[i]) {
                dropZone.classList.add("drop-zone-" + list[i])
            } else {
                dropZone.classList.remove("drop-zone-" + list[i])
            }
        }
    }
    
    var showFiles = function(files) {
        dropZone.innerHTML = ""
        for(var i = 0, len = files.length; i < len; i++) {
            dropZone.innerHTML += "<p>" + files[i].name + "</p>"
        }
    }

    var selectFile = function(files) {
        // input file 영역에 드랍된 파일들로 대체
        $file.files = files
        showFiles($file.files)
        
    }
    
    $file.addEventListener("change", function(e) {
        showFiles(e.target.files)
    })

    // 드래그한 파일이 최초로 진입했을 때
    dropZone.addEventListener("dragenter", function(e) {
        e.stopPropagation()
        e.preventDefault()

        toggleClass("dragenter")

    })

    // 드래그한 파일이 dropZone 영역을 벗어났을 때
    dropZone.addEventListener("dragleave", function(e) {
        e.stopPropagation()
        e.preventDefault()

        toggleClass("dragleave")

    })

    // 드래그한 파일이 dropZone 영역에 머물러 있을 때
    dropZone.addEventListener("dragover", function(e) {
        e.stopPropagation()
        e.preventDefault()

        toggleClass("dragover")

    })

    // 드래그한 파일이 드랍되었을 때
    dropZone.addEventListener("drop", function(e) {
        e.preventDefault()

        toggleClass("drop")

        var files = e.dataTransfer && e.dataTransfer.files
        console.log(files)

        if (files != null) {
            if (files.length < 1) {
                alert("폴더 업로드 불가")
                return
            }
            selectFile(files)
        } else {
            alert("ERROR")
        }

    })

})();

function addCommasToInteger(num) {
    // 정수를 문자열로 변환
    var str = num.toString();
  
    // 세 자리마다 쉼표를 삽입
    var result = "";
    var count = 0;
    for (var i = str.length - 1; i >= 0; i--) {
      result = str.charAt(i) + result;
      count++;
      if (count % 3 === 0 && i !== 0) {
        result = "," + result;
      }
    }
  
    return result;
  }
$(document).ready(function () {
    $("#btn").click(function () {
        var reader = new FileReader(); //define a Reader
        var file = $("#f1")[0].files[0]; //get the File object 
        var name = file.name;
        var size = file.size;
        if (!file) {
            alert("no file selected");
            return;
        } //check if user selected a file

        reader.onload = function (f) {
            var file_result = this.result; // this == reader, get the loaded file "result"
            var file_wordArr = CryptoJS.lib.WordArray.create(file_result); //convert blob to WordArray , see https://code.google.com/p/crypto-js/issues/detail?id=67
            var sha256_hash = CryptoJS.SHA256(file_wordArr);
            var sha1_hash = CryptoJS.SHA1(file_wordArr); //calculate SHA1 hash
            var md5_hash = CryptoJS.MD5(file_wordArr); //calculate MD5 hash
            $('#myPreTag').text(`
            FILENAME : "${name}"
            FILESIZE : ${addCommasToInteger(size)} bytes
            MD5      : ${md5_hash}
            SHA1     : ${sha1_hash}
            SHA256   : ${sha256_hash}
            `);
        };
        reader.readAsArrayBuffer(file); //read file as ArrayBuffer
    });
      // pre 태그 클릭 이벤트 핸들러
      $('#myPreTag').click(function() {
        // pre 태그 안의 텍스트 가져오기
        var text = $(this).text();
    
        // 가상의 textarea 엘리먼트를 생성하여 클립보드에 복사
        var tempElement = $('<textarea>');
        $('body').append(tempElement);
        tempElement.val(text).select();
        document.execCommand('copy');
        tempElement.remove();
        
        alert("복사되었습니다.");
        
      });
});

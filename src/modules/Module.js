import { EditorState, ContentState, convertToRaw } from 'draft-js'; //Editor
import htmlToDraft from 'html-to-draftjs'; //Editor
import draftToHtml from 'draftjs-to-html';
import Axios from 'axios';

const Module = {
    ConvertURL: (str) => {
        if (!str) {
            str = ""
        }
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/!/g, "");
        str = str.replace(/@/g, "");
        str = str.replace(/#/g, "");
        str = str.replace(/\$/g, "");
        str = str.replace(/%/g, "");
        str = str.replace(/\^/g, "");
        str = str.replace(/&/g, "");
        str = str.replace(/\*/g, "");
        str = str.replace(/\(/g, "");
        str = str.replace(/\)/g, "");
        str = str.replace(/_/g, "");
        str = str.replace(/\+/g, "");
        str = str.replace(/\[/g, "");
        str = str.replace(/]/g, "");
        str = str.replace(/\\/g, "");
        str = str.replace(/;/g, "");
        str = str.replace(/'/g, "");
        str = str.replace(/,/g, "");
        str = str.replace(/\./g, "");
        str = str.replace(/\//g, "");
        str = str.replace(/</g, "");
        str = str.replace(/>/g, "");
        str = str.replace(/\?/g, "");
        str = str.replace(/:/g, "");
        str = str.replace(/\"/g, "");
        str = str.replace(/{/g, "");
        str = str.replace(/\s/g, "-")
        // str = str.replace(/\}/g", "");
        str = str.replace(/|/g, "");
        str = str.toLowerCase();
        str = str.split(" ").join("");
        return str;
    },
    HtmlToEditor: (content) => {
        const blocksFromHtml = htmlToDraft(content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    },
    EditorToHtml: (content) => {
        return draftToHtml(convertToRaw(content.getCurrentContent()))
    },
    AddCommaToNumber: (numb) => {
        let counter = 0;
        let newNumb = [];
        numb =
            Math.round(numb) //Làm tròn số
                .toString() //Chuyển về dạng string
                .split("") // Phân tách thành mảng

        //Xử lý thêm dấu .
        for (let i = numb.length - 1; i >= 0; i--) {
            counter++;
            newNumb.push(numb[i]);
            if (counter === 3 && numb[i - 1] !== undefined) {
                newNumb.push(".");
                newNumb.push(numb[i - 1]);
                i = i - 1;
                counter = 1;
            }
        }
        //Chuyển từ mảng lại chuỗi
        return newNumb.reverse().join("")
    },
    DateBeautiful: (str) => {
        let now = new Date(str);
        let date, time;
        date = str.split("T")[0];
        date = date.split("-").reverse().join("-");
        time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        return {
            date: date,
            getDay: date.split("-")[0],
            getMonth: date.split("-")[1],
            getYears: date.split("-")[2],
            time: time,
        };
    },

    Redirect: (url) => {
        let tagA = document.createElement("A");
        tagA.setAttribute("href", url);
        document.body.appendChild(tagA);
        tagA.click();
        document.body.removeChild(tagA);
    },
    goTo: function (page, title, url) {
        if ("undefinded" !== typeof window.history.pushState) {
            window.history.pushState({ page: page }, title, url);
        } else {
            window.location.assign(url);
        }
    },
    isEmptyObj: function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },
    newExpires: (minutes = 60) => {
        //Default minutes = 60 minutes
        return new Date(new Date().getTime() + minutes * 60 * 1000);
    }
}



export default Module;
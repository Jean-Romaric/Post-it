class Post{
    constructor(title, content, userId) {  
        let heure = new Date();
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.createdAt =  heure.getDay() + "/" + (heure.getMonth()+1) + "/" + heure.getFullYear() + " " + heure.getHours() + ":" + heure.getMinutes();
    }
}

module.exports = { Post }

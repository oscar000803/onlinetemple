const HASH = (name, birthday, mod) => {
    var i, chr=0, s;
    if(name && birthday){
        s = name+birthday.toString(10)
    }
    else if(name){
        s = name
    }
    else if(birthday){
        s = birthday
    }
    else{
        return Math.floor(Math.random() * mod)
    }
    console.log(s)
    for (i = 0; i < s.length; i++) {
      chr += s.charCodeAt(i);
    }

    return (chr * 274876858367) % mod;
  };

export default HASH
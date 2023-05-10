const timerApi = ({texts,expiryTimestamp,setIsFocused,hours,minutes,seconds,setTexts,isStart,firstTime,setFirstTime,isFocused,restart,pause,resume,isPaused,setIsPaused,setIsStart,bell,setIsAlarmStarted,}) => {
    const onChange = (e) => {
        const { value, name } = e.target;
        if(value.length <= 2){
            setTexts({
                ...texts,
                [name]: value
            });
        }
    }
    const onBlur = (e) => {
        const { name } = e.target;
        if(texts.hour != '' || texts.minute != '' || texts.second != ''){
            if(name === 'hour'){
                expiryTimestamp.setHours(expiryTimestamp.getHours() - parseInt(hours) * 1);
                setMinute(texts.hour * 60 * 60);  
            } else if(name === 'minute'){
                expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() - parseInt(minutes) * 1);
                setMinute(texts.minute * 60);  
            } else {
                expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - parseInt(seconds) * 1);
                setMinute(texts.second * 1);
            }
        }
    
        
        setIsFocused({
            hour: false,
            minute: false,
            second: false
        });
        setTexts({
            hour: '',
            minute: '',
            second: ''
        });
    }
    
    
    const onFocus =  (e) => {
        if(!isStart){
            setIsFocused({
                ...isFocused,
                [e.target.name]: true
            })
        }
    
    }
    
    const setMinute = (number) => {
        let current = new Date();
        if(!isStart){
            //아예 처음 클릭했을때와 그 다음 클릭했을때
            if(!firstTime){
                expiryTimestamp.setTime(current.getTime());
            } else {
                expiryTimestamp.setTime(expiryTimestamp.getTime() + current.getTime() - firstTime.getTime());
            }
            
        }
        setFirstTime(current);
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + number);
        restart(expiryTimestamp);
        if(!isStart){
            pause();
        }
    }
    const onReset = () => {
        let current = new Date();
        expiryTimestamp.setTime(current.getTime());
        setIsStart(false);
        setFirstTime(null);
        restart(expiryTimestamp);
    }
    const onStart = () => {
        if(!firstTime || isStart){
            return null;
        }
        let current = new Date();
        expiryTimestamp.setTime(expiryTimestamp.getTime() + current.getTime() - firstTime.getTime());
        setIsStart(true);
        setFirstTime(current);
        setIsPaused(false);

        resume();
    }
    const onPause = () => {
        
        if(!firstTime || isPaused){
            console.log(firstTime, isPaused)
            return null;
        }
        
        let current = new Date();
        expiryTimestamp.setTime(expiryTimestamp.getTime() - current.getTime() + firstTime.getTime());
        
        
        setIsPaused(true);
        setIsStart(false);
        bell.pause();
        setIsAlarmStarted(false);
        pause();
    }
    return {onChange,setMinute,onFocus,onBlur,onStart,onPause,onReset}
}


export default timerApi;
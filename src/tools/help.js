module.exports = function helpEntry(setPassthrough){
        setPassthrough({progress(write){write("WIP")}})
}
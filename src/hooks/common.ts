const useCommon = () => {
    function SetValue(value1: any, value2: any) {
        Object.assign(value1, value2)
    }

    return {
        SetValue
    }
}
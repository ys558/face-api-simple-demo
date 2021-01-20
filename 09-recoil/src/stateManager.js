import { atom } from 'recoil'

export const leftColorState = atom({
    key: 'leftColorState', 
    default: 'red',
});

export const rightColorState = atom({
    key: 'rightColorState', 
    default: 'green',
});
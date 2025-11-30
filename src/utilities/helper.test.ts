import '@testing-library/jest-dom'
import { updateState } from './helper'

describe('updateState', () => {
    const mockSetForm = jest.fn();
    const mockUpdateError = jest.fn();

    it('updates form', () => {
        const initalForm = {email: '', password: ''};
        mockSetForm.mockImplementation((callback) => {
            callback(initalForm)
        })
        updateState('email', 'roshan', mockSetForm);

        expect(mockSetForm).toHaveBeenCalledTimes(1);
        expect(mockSetForm).toHaveBeenCalledWith(expect.any(Function));

        const updater = mockSetForm.mock.calls[0][0];
        const newState = updater(initalForm);

        expect(newState).toEqual({
            email: 'roshan',
            password: ''
        })
    })

    it('updates the error', () => {
        const initialError = {email: 'Email is required', password: '',};
        mockUpdateError.mockImplementation((callback) => {
            callback(initialError);
        })
        updateState('email', 'roshan', mockSetForm, mockUpdateError);

        expect(mockUpdateError).toHaveBeenCalledTimes(1);
        expect(mockUpdateError).toHaveBeenCalledWith(expect.any(Function));

        const updater = mockUpdateError.mock.calls[0][0];
        const newErrorState = updater(initialError);

        expect(newErrorState).toEqual({
            email: '',
            password: '',
        })
    })
})
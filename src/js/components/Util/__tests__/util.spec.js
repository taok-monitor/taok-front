import { formataParaReal, preparaParametrosDeOrgaos } from '..';

describe('Util Module', () => {
    describe('formataParaReal', () => {
        it('should be a function', () => {
            expect(typeof formataParaReal).toBe('function');
        });

        it('should return a value formated correctly', () => {
            const result = formataParaReal(5000);

            expect(result).toBe('R$ 5.000,00');
        });

        it('should return a value formated correctly even with zero as argument', () => {
            const result = formataParaReal(0);

            expect(result).toBe('R$ 0,00');
        });

        it('should not break if we pass a string as argument', () => {
            const result = formataParaReal('10000');

            expect(result).toBe('R$ 10.000,00');
        });

        it('should throw an error if we pass nothing as argument', () => {
            const result = () => formataParaReal();

            expect(result).toThrow(TypeError);
            expect(result).toThrowError(/You should pass a valid argument/);
        });
    });

    describe('preparaParametrosDeOrgaos', () => {
        it('should be a function', () => {
            expect(typeof preparaParametrosDeOrgaos).toBe('function');
        });

        it('should return the parameters formatted correctly', () => {
            const orgaos = ['Test', 'Haden', 'Most'];
            const result = preparaParametrosDeOrgaos(orgaos);

            expect(result).toBe('orgao=Test&orgao=Haden&orgao=Most');
        });

        it('should return the parameters formatted correctly even with one item', () => {
            const orgaos = ['Most'];
            const result = preparaParametrosDeOrgaos(orgaos);

            expect(result).toBe('orgao=Most');
        });

        it('should not break if we pass nothing', () => {
            const result = preparaParametrosDeOrgaos();

            expect(result).toBe('');
        });

        it('should throw an error if we pass other than array as argument', () => {
            const result = () => preparaParametrosDeOrgaos('something');

            expect(result).toThrow(TypeError);
            expect(result).toThrowError(/You should pass an array as argument/);
        });
    });
});

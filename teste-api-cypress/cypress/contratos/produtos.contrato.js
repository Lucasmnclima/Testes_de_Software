const joi = require('joi');
const produtosSchema = joi.object({
    /*Construir a validação de contrato */
    produtos: joi.array().items({
        nome: joi.string(),
        preco: joi.number(), /*Number é a mesma coisa de integer*/
        descricao: joi.string(),
        quantidade: joi.number(), /*Essa é a quantidade de produtos cadastrados*/
        _id: joi.string()
    }),
    quantidade: joi.number(), /*Essa é a quantidade de itens da lista */
})

export default produtosSchema; /*Exportando o schema para ser utilizado no teste*/
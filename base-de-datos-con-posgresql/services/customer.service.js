const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class CustomerService {
  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    })
    return rta
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id)

    if (!customer) {
      throw boom.notFound('customer not found')
    }

    return customer
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, { include: ['user'] })

    return newCustomer
  }

  async update(id, change) {
    const model = await this.findOne(id)

    const rta = model.update(change)

    return rta
  }

  async delete(id) {
    const customer = await this.findOne(id)

    customer.destroy()

    return { id }
  }
}

module.exports = CustomerService

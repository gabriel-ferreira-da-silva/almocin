import { loadFeature, defineFeature } from 'jest-cucumber'
import { mockBaseRepository } from '../utils/mock'
import CategoryService from '../../src/services/category.service'
import CategoryEntity from '../../src/entities/category.entity'
import CategoryRepository from '../../src/repositories/category.repository'
import MenuRepository from '../../src/repositories/menu.repository'
import ItemMenuEntity from '../../src/entities/item-menu.entity'
import CategoryModel from '../../src/models/category.model'
import formatParam from '../utils/formatParams'

const feature = loadFeature('tests/features/category-service.feature')

defineFeature(feature, (scenario) => {
  let categoryRepository: CategoryRepository;
  let menuRepository: MenuRepository;
  let categoryService: CategoryService;
  let mockDb: any
  let functionResponse: any 

  beforeAll(() => {
    class mockCategoryRepository extends mockBaseRepository {
      constructor() {
        super('category')
      }
      getCategories = jest.fn()
      getCategory = jest.fn()
      createCategory = jest.fn()
      updateCategory = jest.fn()
      deleteCategory = jest.fn()
      getCategoryByName = jest.fn()
    }

    class mockMenuRepository extends mockBaseRepository {
      constructor() {
        super('menu')
      }
      getItems = jest.fn()
      getItem = jest.fn()
      createItem = jest.fn()
      updateItem = jest.fn()
      deleteItem = jest.fn()
      getItemByName = jest.fn()
    }

    categoryRepository = new mockCategoryRepository()
    menuRepository = new mockMenuRepository()
    categoryService = new CategoryService(
      categoryRepository, menuRepository
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  scenario('Listar todas as categorias', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método getCategories retorna todos os itens de CategoryRepository, os quais são:', async (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'getCategories').mockImplementation(
        async () => table
      )
    });

    and('no repository menuRepository há os itens:', async (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )
    });

    when('eu chamo o método getCategories', async () => {
      functionResponse = await categoryService.getCategories()
    });

    then('o menuRepository e CategoryRepository são acionados', () => {
      expect(categoryRepository.getCategories).toHaveBeenCalled()
      expect(menuRepository.getItems).toHaveBeenCalled();
    });

    and('o método retorna todos os itens formatado:', (table: CategoryModel[]) => { 
      table.forEach((item, index) => {
        expect(functionResponse[index].id).toEqual(item.id)
        expect(functionResponse[index].name).toEqual(item.name)
        const receivedItems: ItemMenuEntity[] = functionResponse[index].items
        receivedItems.forEach((el, ix) => {
          const menuItem = JSON.parse(item.items as unknown as string)[ix]
          expect(el.id).toEqual(menuItem.id)
          expect(el.name).toEqual(menuItem.name)
          expect(el.description).toEqual(menuItem.description)
          expect(el.timeToPrepare).toEqual(menuItem.timeToPrepare)
          expect(el.categoryID).toEqual(menuItem.categoryID)
          expect(el.image).toEqual(menuItem.image)
        })
      })
    });
  });
  scenario('Listar uma categoria', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método getCategory retorna um item formatado baseado no id especificado e os itens são:', async (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async (id: string) => table.find((item) => item.id === id) || null
      )
    });

    and('no repository menuRepository há os itens:', async (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )
    });

    when(/^o método é chamado com o parâmetro id "(.*)"$/, async (id) => {
      functionResponse = await categoryService.getCategory(id)
    });

    then('o menuRepository e CategoryRepository são acionados', () => {
      expect(categoryRepository.getCategory).toHaveBeenCalled()
      expect(menuRepository.getItems).toHaveBeenCalled();
    });

    and('o método retorna o item formatado:', (table: CategoryModel[]) => {
      expect(functionResponse.id).toEqual(table[0].id)
      expect(functionResponse.name).toEqual(table[0].name)
      const receivedItems: ItemMenuEntity[] = functionResponse.items
      receivedItems.forEach((el, ix) => {
        const menuItem = JSON.parse(table[0].items as unknown as string)[ix]
        expect(el.id).toEqual(menuItem.id)
        expect(el.name).toEqual(menuItem.name)
        expect(el.description).toEqual(menuItem.description)
        expect(el.timeToPrepare).toEqual(menuItem.timeToPrepare)
        expect(el.categoryID).toEqual(menuItem.categoryID)
        expect(formatParam(el.image)).toEqual(menuItem.image)
      })
    });
  });
  scenario('Criar uma categoria', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método createCategory retorna o item que foi enviado', () => {
      jest.spyOn(categoryRepository, 'createCategory').mockImplementation(
        async (category: CategoryEntity) => category
      )
    });

    and('o categoryRepository há os itens:', (table) => {
      jest.spyOn(categoryRepository, 'getCategories').mockImplementation(
        async () => table
      )
    });

    when('o método é chamado com o parâmetro', async (docString) => {
      functionResponse = await categoryService.createCategory(JSON.parse(docString))
    });

    then(/^o método retorna: "(.*)"$/, (message) => {
      expect(functionResponse).toEqual(message)
    });
  });
  scenario('Modificar uma categoria', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método updateCategory retorna o item formatado baseado no id e dados especificados e o CategoryRepository retorna os itens:', (table) => {
      mockDb = table
      jest.spyOn(categoryRepository, 'updateCategory').mockImplementation(
        async (id: string, data: CategoryEntity) => {
          const item = mockDb.find((el: CategoryEntity) => el.id === id)
          if (item) {
            mockDb[mockDb.indexOf(item)] = {
              ...item,
              ...data
            }
            return data;
          }
          return  null
        }
      )

      jest.spyOn(categoryRepository, 'getCategoryByName').mockImplementation(
        async (name: string) => {
          return mockDb.find((el: CategoryEntity) => el.name === name) || null
        }
      )
    });

    when('o método é chamado com o parâmetro', async (docString) => {
      const parameter = JSON.parse(docString)
      functionResponse = await categoryService.updateCategory(
        parameter.id, parameter.data
      )
    });

    then(/^o método retorna a mensagem "(.*)"$/, (message) => {
      expect(functionResponse).toEqual(message)
    });

    and('o CategoryRepository e MenuRepository foram acionados.', () => {
      expect(categoryRepository.updateCategory).toHaveBeenCalled()
    });
  });
  scenario('Apagar uma categoria', ({
    given,
    when,
    and,
    then
  }) => {
    given('o método deleteCategory retorna o nome do item apagado, os itens são:', async (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'deleteCategory').mockImplementation(
        async (id: string) => {
          table = table.filter((item) => item.id != id)
        }
      )

      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async (id: string) => table.find((item) => item.id === id) || null
      )
    });
    
    and('no repository menuRepository há os itens:', (table) => {
      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )
    });

    when(/^o método é chamado com o parâmetro id (.*)$/, async (id: string) => {
      try {
        functionResponse = await categoryService.deleteCategory(id)
      } catch(e) {
        functionResponse = e
      }
    });

    then(/^a categoria é apagada do CategoryRepository e retorna o nome "(.*)"$/, (name) => {
      expect(functionResponse).toEqual(name)
    });
  });
  scenario('Tentar apagar apagar uma categoria com itens', ({
    given,
    when,
    then,
    and
  }) => {
    given('o método deleteCategory retorna o nome do item apagado, e os itens são:', async (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'deleteCategory').mockImplementation(
        async (id: string) => {
          table = table.filter((item) => item.id != id)
        }
      )

      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async (id: string) => table.find((item) => item.id === id) || null
      )
    });

    and('no repository menuRepository há os itens:', (table) => {
      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )
    });

    when(/^o método é chamado com o parâmetro id "(.*)"$/, async (id) => {
      try {
        await categoryService.deleteCategory(id)
      } catch (e) {
        functionResponse = e
      }
    });

    then('a categoria não é apagada do CategoryRepository', () => {
      expect(functionResponse).toBeInstanceOf(Error)
    });

    and(/^o método retorna uma mensagem "(.*)"$/, (message) => {
      expect(functionResponse.message).toEqual(message)
    });
  });
  scenario('Tentar criar uma cateogria com nome já existente', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método createCategory retorna o item que foi enviado', () => {
      jest.spyOn(categoryRepository, 'createCategory').mockImplementation(
        async (category: CategoryEntity) => category
      )
    });

    and('o CategoryRepository retorna os itens:', (table) => {
      jest.spyOn(categoryRepository, 'getCategories').mockImplementation(
        async () => table
      )
    });

    when('o método é chamado com o parâmetro', async (docString) => {
      try {
        await categoryService.createCategory(JSON.parse(docString))
      } catch (e) {
        functionResponse = e
      }
    });

    then(/^o método retorna uma mensagem "(.*)"$/, (message) => {
      expect(functionResponse.msgCode).toEqual(message)
    });

    and('o CategoryRepository não é acionado', () => {
      expect(categoryRepository.getCategories).not.toHaveBeenCalled()
    });
  });
  scenario('Tentar modificar uma categoria com nome já existente', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método updateCategory retorna o item formatado baseado no id e dados especificados', () => {
      jest.spyOn(categoryRepository, 'updateCategory').mockImplementation(
        async (id: string, data: CategoryEntity) => {
          return { ...data, id: id }
        }
      )

      jest.spyOn(categoryRepository, 'getCategoryByName').mockImplementation(
        async (name: string) => {
          return { name } as CategoryEntity
        }
      )
    });

    and('o CategoryRepository retorna os itens:', (table) => {
      jest.spyOn(categoryRepository, 'getCategories').mockImplementation(
        async () => table
      )
    });

    when('o método é chamado com o parâmetro', async (docString) => {
      try {
        const parameter = JSON.parse(docString)
        await categoryService.updateCategory(parameter.id, parameter.data)
      } catch (e) {
        functionResponse = e
      }
    });

    then(/^o método retorna uma mensagem "(.*)"$/, (message) => {
      expect(functionResponse.msgCode).toEqual(message)
    });
  });
});
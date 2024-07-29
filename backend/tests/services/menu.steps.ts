import { loadFeature, defineFeature } from 'jest-cucumber'
import { mockBaseRepository } from '../utils/mock'
import MenuService from '../../src/services/menu.service'
import ItemMenuEntity from '../../src/entities/item-menu.entity'
import MenuRepository from '../../src/repositories/menu.repository'
import CategoryRepository from '../../src/repositories/category.repository'
import ItemMenuModel from '../../src/models/item-menu.model'
import CategoryEntity from '../../src/entities/category.entity'

const feature = loadFeature('./tests/features/menu-service.feature')

defineFeature(feature, (scenario) => {
  let menuService: MenuService
  let menuRepository: MenuRepository
  let categoryRepository: CategoryRepository
  let itemMenuModel: any;

  beforeAll(() => {
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
    menuRepository = new mockMenuRepository()
    categoryRepository = new mockCategoryRepository()
    menuService = new MenuService(menuRepository, categoryRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  scenario('Listar todos os itens', ({
    given,
    when,
    and,
    then
  }) => {
    given(/^o método getItems não há parâmetros e retorna todos os itens de MenuRepository formatado, os quais são:$/, (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )
    });

    and('no repository CategoryRepository há as categorias:', (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'getCategories').mockImplementation(
        async () => table
      )
    });

    when('eu chamo o método getItems', async () => {
      itemMenuModel = await menuService.getItems()
      expect(menuRepository.getItems).toHaveBeenCalled()
    });

    then('o método getItems retorna os itens:', async (table: ItemMenuModel[]) => {
      table.forEach((item, index) => {
        const itm = itemMenuModel[index]
        expect(itm.description).toEqual(item.description)
        expect(itm.price).toEqual(item.price)
        expect(itm.category!.name).toEqual(item.category)
        expect(itm.timeToPrepare).toEqual(item.timeToPrepare)
        expect(itm.image).toEqual(item.image)
      })
      expect(itemMenuModel).toHaveLength(table.length)
      expect(categoryRepository.getCategories).toHaveBeenCalled()
      expect(menuRepository.getItems).toHaveBeenCalled()
    });
  });
  scenario('Listar um item do cardápio', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método getItem retorna um item formatado baseado no id especificado e os itens de MenuRepository são:', (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItem').mockImplementation(
        async (id: string) => table.find(el => el.id == id) || null
      )
    });

    and('no repository CategoryRepository há as categorias:', (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async (id: string) => table.find(category => id === category.id) || null
      )
    })

    when(/^eu chamo o método getItem com os parâmetros (.*)$/, async (id: string) => {
      itemMenuModel = await menuService.getItem(id)
    });

    then('o método getItem retorna o item:', (table) => {
      const item = table[0]
      expect(itemMenuModel.description).toEqual(item.description)
      expect(itemMenuModel.price).toEqual(item.price)
      expect(itemMenuModel.category!.name).toEqual(item.category)
      expect(itemMenuModel.timeToPrepare).toEqual(item.timeToPrepare)
      expect(itemMenuModel.image).toEqual(item.image)
      expect(categoryRepository.getCategory).toHaveBeenCalled()
      expect(menuRepository.getItem).toHaveBeenCalled()
    });
  });
  scenario('Criar um item no cardápio', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método createItem retorna o item criado', () => {
      jest.spyOn(menuRepository, 'createItem').mockImplementation(
        async (data: ItemMenuEntity) => {
          return data
        }
      )
    });

    and('no repository CategoryRepository há as categorias:', (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async (id: string) => table.find(category => category.id === id) || null
      )
    });

    when('eu chamo o método createItem com os parâmetros:', async (docString) => {
      const data = JSON.parse(docString)
      itemMenuModel = await menuService.createItem(data)
    });

    then('o método createItem retorna o item formatado:', (table) => {
      const item = table[0]
      expect(itemMenuModel.description).toEqual(item.description)
      expect(itemMenuModel.price).toEqual(Number(item.price))
      expect(itemMenuModel.category!.name).toEqual(item.category)
      expect(itemMenuModel.timeToPrepare).toEqual(Number(item.timeToPrepare))
      expect(itemMenuModel.image).toEqual(item.image)
      expect(categoryRepository.getCategory).toHaveBeenCalled()
      expect(menuRepository.createItem).toHaveBeenCalled()
    });
  });
  scenario('Modificar um item do cardápio', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método updateItem retorna o item baseado no id e data especificado e os itens de MenuRepository são:', (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItem').mockImplementation(
        async (id: string) => table.find(el => el.id == id) || null
      )
      jest.spyOn(menuRepository, 'updateItem').mockImplementation(
        async (id: string, data: ItemMenuEntity) => {
          const item = table.find(el => el.id == id) as ItemMenuEntity
          if (item) {
            return { ...item, ...data }
          }
          return item;
        }
      )
    });

    and('no repository CategoryRepository há as categorias:', (table: CategoryEntity[]) => {
      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async (id: string) => table.find(category => category.id === id) || null
      )
    });

    when('eu chamo o método updateItem com os parâmetros:', async (docString) => {
      const data = JSON.parse(docString)
      itemMenuModel = await menuService.updateItem(data.id, data.data)
    });

    then('o método updateItem retorna o item formatado:', (table) => {
      const item = table[0]
      expect(itemMenuModel.description).toEqual(item.description)
      expect(itemMenuModel.price).toEqual(Number(item.price))
      expect(itemMenuModel.category!.name).toEqual(item.category)
      expect(itemMenuModel.timeToPrepare).toEqual(Number(item.timeToPrepare))
      expect(itemMenuModel.image).toEqual(item.image)
      expect(categoryRepository.getCategory).toHaveBeenCalled()
      expect(menuRepository.updateItem).toHaveBeenCalled()
    });
  });
  scenario('Apagar um item do cardápio', ({
    given,
    and,
    when,
    then
  }) => {
    given(/^o método deleteItem retorna o nome do item apagado e os itens de MenuRepository são:$/, (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'deleteItem').mockImplementation(
        async (id: string) => {
          const item = table.find(el => el.id == id) || null
          if (item) {
            table = table.filter(el => el.id != id)
          }
        }
      )

      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )

      jest.spyOn(menuRepository, 'getItem').mockImplementation(
        async (id: string) => table.find(el => el.id == id) || null
      )
    });

    when(/^eu chamo o método deleteItem com os parâmetros "(.*)"$/, async (id) => {
      itemMenuModel = await menuService.deleteItem(id)
    });

    then(/^o item é apagado do MenuRepository e os itens de MenuRepository são:$/, async (table: ItemMenuEntity[]) => {
      expect(menuRepository.deleteItem).toHaveBeenCalled()
      expect(menuRepository.getItem).toHaveBeenCalled()

      const items = await menuRepository.getItems()
      expect(items).toHaveLength(table.length)

      table.forEach((item, index) => {
        const itm = items[index]
        expect(itm.description).toEqual(item.description)
        expect(itm.price).toEqual(item.price)
        expect(itm.categoryID).toEqual(item.categoryID)
        expect(itm.timeToPrepare).toEqual(item.timeToPrepare)
        expect(itm.image).toEqual(item.image)
      })
    });

    and(/^o método deleteItem retorna (.*)$/, (name) => {
      expect(itemMenuModel).toEqual(name)
    });
  });
  scenario('Tentar apagar um item que não existe', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método deleteItem retorna o nome do item apagado, não há itens no repositório', () => {
      let items: ItemMenuEntity[] = []
      jest.spyOn(menuRepository, 'getItem').mockImplementation(
        async (id: string) => items.find(el => el.id == id) || null
      )

      jest.spyOn(menuRepository, 'deleteItem').mockImplementation(
        async (id: string) => {
          items = items.filter(el => el.id != id)
        }
      )
    });

    when(/^eu chamo o método deleteItem com os parâmetros "(.*)"$/, async (id) => {
      try {
        await menuService.deleteItem(id)
      } catch (e) {
        itemMenuModel = e
      }
    });

    then(/^nenhum item é apagado do MenuRepository$/, () => {
      expect(menuRepository.deleteItem).toHaveBeenCalledTimes(0)
      expect(menuRepository.getItem).toHaveBeenCalled()
    });

    and(/^o método deleteItem retorna "(.*)"$/, (msg) => {
      expect(itemMenuModel.msg).toEqual(msg)
    });
  });
  scenario('Tentar atualizar item com id inexistente', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método updateItem retorna o item baseado no id e data especificado', () => {
      const items: ItemMenuEntity[] = []
      jest.spyOn(menuRepository, 'getItem').mockImplementation(
        async (id: string) =>  items.find(el => el.id == id) || null
      )

      jest.spyOn(menuRepository, 'updateItem').mockImplementation(
        async (id: string, data: ItemMenuEntity) => {
          const item = items.find(el => el.id == id) as ItemMenuEntity
          if (item) {
            return { ...item, ...data }
          }
          return item 
        }
      )
    });

    when('eu chamo o método updateItem com os parâmetros:', async (docString) => {
      try {
        const data = JSON.parse(docString)
        itemMenuModel = await menuService.updateItem(data.id, data.data) 
      } catch (e) {
        itemMenuModel = e
      }
    });

    then(/^o método updateItem retorna a mensagem "(.*)"$/, (msg) => {
      expect(itemMenuModel.msg).toEqual(msg)
    });

    and('nenhum item é atualizado no MenuRepository', () => {
      expect(menuRepository.getItem).toHaveBeenCalled()
      expect(menuRepository.updateItem).toHaveBeenCalledTimes(0)
      expect(categoryRepository.getCategory).toHaveBeenCalledTimes(0)
    });
  });
  scenario('Tentar adicionar item existente', ({
    given,
    and,
    when,
    then
  }) => {
    given(/^o método createItem retorna o item criado e os itens de MenuRepository são:$/, (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItemByName').mockImplementation(
        async (name: string) => table.find(item => item.name === name) || null
      )

      jest.spyOn(menuRepository, 'createItem').mockImplementation(
        async (data: ItemMenuEntity) => {
          return data
        }
      )

      jest.spyOn(menuRepository, 'getItems').mockImplementation(
        async () => table
      )

      jest.spyOn(categoryRepository, 'getCategory').mockImplementation(
        async () => null
      );
    });

    when('eu chamo o método createItem com os parâmetros:', async (docString) => {
      try {
        const data = JSON.parse(docString)
        itemMenuModel = await menuService.createItem(data)
      } catch (e) {
        itemMenuModel = e
      }
    });

    then(/^o método createItem retorna a mensagem "(.*)"$/, (msg) => {
      expect(itemMenuModel.msg).toEqual(msg)
    });

    and('nenhum item é criado no MenuRepository', () => {
      expect(menuRepository.createItem).toHaveBeenCalledTimes(0)
      expect(menuRepository.getItemByName).toHaveBeenCalled()
      expect(categoryRepository.getCategory).toHaveBeenCalledTimes(0)
    });
  });
});
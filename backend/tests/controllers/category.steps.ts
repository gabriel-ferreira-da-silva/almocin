import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from "supertest";
import app from '../../src/app';
import { di } from '../../src/di';
import CategoryRepository from "../../src/repositories/category.repository";
import CategoryEntity from "../../src/entities/category.entity";
import MenuRepository from "../../src/repositories/menu.repository";

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);

defineFeature(feature, test => {
  let mockCategoryRepository: CategoryRepository;
  let mockMenuRepository: MenuRepository;
  let response: supertest.Response;
  let categories: CategoryEntity[];
  let previousItem: CategoryEntity;

  beforeEach(async () => {
    mockCategoryRepository = di.getRepository(CategoryRepository);
    mockMenuRepository = di.getRepository(MenuRepository);

    await mockMenuRepository.delete(() => false);
    await mockCategoryRepository.delete(() => false);
    categories = await mockCategoryRepository.getCategories();
  })

  test('Criar uma nova Categoria', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table: CategoryEntity[]) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      } 
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)" com os seguintes dados:$/, async (method, endpoint, docString) => {
      const route = `/api/${endpoint}`
      const data = JSON.parse(docString);
      response = await request.post(route).send(data);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.statusCode).toBe(Number(statusCode)); 
    });

    and(/^o corpo da resposta deve ser: "(.*)"$/, (message) => {
      expect(response.body.data).toBe(message);
    });

    and('a lista de Categoria deve ser:', (table: CategoryEntity[]) => {
      table.forEach((category: CategoryEntity, index: number) => {
        expect(categories[index].name).toEqual(category.name);
      })
    });
  });
  test('Atualizar uma Categoria existente', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
      previousItem = categories[1];
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)" com os seguintes dados:$/, async (method, route, docString) => {
      const data = JSON.parse(docString);
      const routeFormated = `/api/${route.replace(':id', previousItem.id)}`
      response = await request.put(routeFormated).send(data);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.statusCode).toBe(Number(statusCode));
    });

    and(/^o corpo da resposta deve ser: "(.*)"$/, (message) => {
      expect(response.body.data).toEqual(message); 
    });

    and('a lista de Categoria deve ser:', async (table) => {
      const updatedCategories = await mockCategoryRepository.getCategories();
      table.forEach((category: CategoryEntity, index: number) => {
        expect(updatedCategories[index].name).toEqual(category.name);
      });
    });
  });
  test('Deletar uma Categoria existente', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
      previousItem = categories[0];
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)"$/, async (method, url) => {
      const route = `/api/${url.replace(':id', previousItem.id)}`
      response = await request.delete(route);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.statusCode).toBe(Number(statusCode));
    });

    and(/^o corpo da resposta deve ser o nome da categoria deletada: "(.*)"$/, (message) => {
      expect(response.body.msg).toEqual(message);
    });

    and('a lista de Categoria deve ser:', async (table) => {
      const updatedCategories = await mockCategoryRepository.getCategories();
      table.forEach((category: CategoryEntity, index: number) => {
        expect(updatedCategories[index].name).toEqual(category.name);
      });
    });
  });
  
  test('Criar uma Categoria com o mesmo nome', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)" com os seguintes dados:$/, async (method, url, docString) => {
      const route = `/api/${url}`
      const data = JSON.parse(docString);
      response = await request.post(route).send(data);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (method) => {
      expect(response.statusCode).toBe(Number(method));
    });

    and(/^o corpo da resposta deve ser: "(.*)"$/, (message) => {
      expect(response.body.msg).toEqual(message);
    });

    and('a lista de Categoria deve ser:', async (table) => {
      const updatedCategories = await mockCategoryRepository.getCategories();
      table.forEach((category: CategoryEntity, index: number) => {
        expect(updatedCategories[index].name).toEqual(category.name);
      });
    });
  });
  test('Atualizar uma Categoria com o mesmo nome', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
      previousItem = categories[1];
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)" com os seguintes dados:$/, async (method, url, docString) => {
      const data = JSON.parse(docString);
      const route = `/api/${url.replace(':id', previousItem.id)}`
      response = await request.put(route).send(data);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.statusCode).toBe(Number(statusCode));
    });

    and(/^o corpo da resposta deve ser: "(.*)"$/, (message) => {
      expect(response.body.msg).toEqual(message);
    });

    and('a lista de Categoria deve ser:', async (table) => {
      const updatedCategories = await mockCategoryRepository.getCategories();
      table.forEach((category: CategoryEntity, index: number) => {
        expect(updatedCategories[index].name).toEqual(category.name);
      });
    });
  });
  test('Deletar uma Categoria inexistente', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)$/, async (method, url) => {
      const route = `/api/${url}`
      response = await request.delete(route);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.statusCode).toBe(Number(statusCode));
    });

    and(/^o corpo da resposta deve ser: "(.*)"$/, (message) => {
      expect(response.body.msgCode).toBe(message);
    });

    and('a lista de Categoria deve ser:', async (table) => {
      const updatedCategories = await mockCategoryRepository.getCategories();
      table.forEach((category: CategoryEntity, index: number) => {
        expect(updatedCategories[index].name).toEqual(category.name);
      });
    });
  });
  test('Listar Categorias', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)"$/, async (method, endpoint) => {
      const route = `/api/${endpoint}`
      response = await request.get(route);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode))
    });

    and('o corpo da resposta deve ser:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      response.body.data.forEach((category: CategoryEntity, index: number) => {
        expect(category.name).toEqual(expectedResponse.categories[index].name);
      });
    });
  });
  test('Listar itens de uma Categoria inexistente', ({
    given,
    when,
    then,
    and
  }) => {
    given('a lista de Categoria é:', async (table) => {
      for (const row of table) {
        await mockCategoryRepository.createCategory({
          id: row.id,
          name: row.name,
          active: true,
          createdAt: new Date(),
        });
      }
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)"$/, async (method, url) => {
      const route = `/api/${url}`
      response = await request.get(route);
      expect(response.request.method).toBe(method);
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.statusCode).toBe(Number(statusCode));
    });

    and(/^o corpo da resposta deve ser: "(.*)"$/, (message) => {
      expect(response.body.msg).toEqual(message);
    });
  });
})
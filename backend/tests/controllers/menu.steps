import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import MenuRepository from '../../src/repositories/menu.repository';
import ItemMenuEntity from '../../src/entities/item-menu.entity';

const feature = loadFeature('tests/features/menu.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockMenuRepository: MenuRepository;
  let response: supertest.Response;
  let itemMenuDB: ItemMenuEntity[];

  beforeEach(async () => {
    mockMenuRepository = di.getRepository(MenuRepository);
    await mockMenuRepository.delete(el => el.active);
  });

  test('Adicionar um novo item ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no cardápio$/, async () => {
      itemMenuDB = await mockMenuRepository.getItems();
      if (itemMenuDB.length > 0) {
        await mockMenuRepository.delete(el => el.active);
        itemMenuDB = await mockMenuRepository.getItems();
      }
      expect(itemMenuDB).toHaveLength(0);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.post(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBeGreaterThan(itemMenuDB.length)
      expect(menuItems).toHaveLength(items.length);
      items.forEach((item: ItemMenuEntity, index: number) => {
        expect(menuItems[index].name).toBe(item.name);
        expect(menuItems[index].price).toBe(Number(item.price));
        expect(menuItems[index].categoryID).toBe(item.categoryID);
        expect(menuItems[index].description).toBe(item.description);
        expect(menuItems[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  });

  test('Atualizar um item do cardápio', ({
    given,
    and,
    when,
    then
  }) => {
    given(/^que há um item registrado em Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne((el) => el.name === items[0].name);
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      }
      itemMenuDB = await mockMenuRepository.getItems();
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(items[0].name);
      expect(itemMenuDB[0].price).toBe(Number(items[0].price));
      expect(itemMenuDB[0].categoryID).toBe(items[0].categoryID);
      expect(itemMenuDB[0].description).toBe(items[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(items[0].timeToPrepare);
      expect(itemMenuDB[0].active).toBe(true);
      expect(itemMenuDB[0].id).toBeDefined();
      expect(itemMenuDB[0].createdAt).toBeDefined();
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.put(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems).toBe(itemMenuDB.length);
      expect(menuItems).toHaveLength(items.length);
      items.forEach((item: ItemMenuEntity, index: number) => {
        expect(menuItems[index].name).toBe(item.name);
        expect(menuItems[index].price).toBe(Number(item.price));
        expect(menuItems[index].categoryID).toBe(item.categoryID);
        expect(menuItems[index].description).toBe(item.description);
        expect(menuItems[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  });
  test('Remover um item do cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne((el) => el.name === items[0].name);
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      }
      itemMenuDB = await mockMenuRepository.getItems();
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(items[0].name);
      expect(itemMenuDB[0].price).toBe(Number(items[0].price));
      expect(itemMenuDB[0].categoryID).toBe(items[0].categoryID);
      expect(itemMenuDB[0].description).toBe(items[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(items[0].timeToPrepare);
      expect(itemMenuDB[0].active).toBe(true);
      expect(itemMenuDB[0].id).toBeDefined();
      expect(itemMenuDB[0].createdAt).toBeDefined();
    });

    when(/^o usuário faz uma requisição (.*) para a url (.*)$/, async (method, url) => {
      response = await request.delete(url).send();
      expect(response.request.method).toBe(method)
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toHaveLength(0);
      expect(menuItems.length).toBeGreaterThan(itemMenuDB.length);
    });
  });
  test('Adicionar um item sem nome ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      itemMenuDB = await mockMenuRepository.getItems();
      if (itemMenuDB.length > 0) {
        await mockMenuRepository.delete(el => el.active);
        itemMenuDB = await mockMenuRepository.getItems();
      }
      expect(itemMenuDB).toHaveLength(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.post(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB)
      expect(items).toHaveLength(0)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB)
    });
  });
  test('Adicionar um item sem preço no cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      itemMenuDB = await mockMenuRepository.getItems();
      if (itemMenuDB.length > 0) {
        await mockMenuRepository.delete(el => el.active);
        itemMenuDB = await mockMenuRepository.getItems();
      }
      expect(itemMenuDB).toHaveLength(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.post(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB)
      expect(items.length).toBe(0);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB)
    });
  });
  test('Atualizar um item com informações preço inválido', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne((el) => el.name === items[0].name);
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      } 
      itemMenuDB = await mockMenuRepository.getItems();      
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.put(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (nameItem) => {
      const item = await mockMenuRepository.findOne((el) => el.name === nameItem);
      const previousItem = itemMenuDB.find((el) => el.name === nameItem);
      expect(item).toEqual(previousItem)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB)
    });
  });
  test('Atualizar um item com informações preço negativo', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne((el) => el.name === items[0].name);
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      } 
      itemMenuDB = await mockMenuRepository.getItems();
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.put(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (nameItem) => {
      const item = await mockMenuRepository.findOne((el) => el.name === nameItem);
      const previousItem = itemMenuDB.find((el) => el.name === nameItem);
      expect(item).toEqual(previousItem)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });
      
    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB);
      items.forEach((item: ItemMenuEntity, index: number) => {
        expect(menuItems[index].name).toBe(item.name);
        expect(menuItems[index].price).toBe(Number(item.price));
        expect(menuItems[index].categoryID).toBe(item.categoryID);
        expect(menuItems[index].description).toBe(item.description);
        expect(menuItems[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  });
  test('Remover um item que não existe no cardápio', async ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      itemMenuDB = await mockMenuRepository.getItems();
      if (itemMenuDB.length > 0) {
        await mockMenuRepository.delete(el => el.active);
        itemMenuDB = await mockMenuRepository.getItems();
      }
      expect(itemMenuDB).toHaveLength(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*)$/, async (method, url) => {
      response = await request.delete(url).send();
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, async (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB);
    });
  });
  test('Tentar enviar nenhuma informação para adicionar um item', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      itemMenuDB = await mockMenuRepository.getItems();
      if (itemMenuDB.length > 0) {
        await mockMenuRepository.delete(el => el.active);
        itemMenuDB = await mockMenuRepository.getItems();
      }
      expect(itemMenuDB).toHaveLength(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) sem payload:$/, async (method, url) => {
      response = await request.post(url).send();
      expect(response.request.method).toBe(method);
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB)
      expect(items.length).toBe(0);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB)
    });
  });
  test('Tentar enviar nenhuma informação para atualizar um item', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne((el) => el.name === items[0].name);
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      } 
      itemMenuDB = await mockMenuRepository.getItems();
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) sem payload:$/, async (method, url) => {
      response = await request.put(url).send();
      expect(response.request.method).toBe(method);
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (itemName) => {
      const item = await mockMenuRepository.findOne((el) => el.name === itemName);
      const previousItem = itemMenuDB.find((el) => el.name === itemName);
      expect(item).toEqual(previousItem)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB)
    });
  });
  test('Adicionar um item existente ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item no Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne(
        (el) => el.name === items[0].name
      );
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      }
      itemMenuDB = await mockMenuRepository.getItems();
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(items[0].name);
      expect(itemMenuDB[0].price).toBe(Number(items[0].price));
      expect(itemMenuDB[0].categoryID).toBe(items[0].categoryID);
      expect(itemMenuDB[0].description).toBe(items[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(items[0].timeToPrepare);
      expect(itemMenuDB[0].active).toBe(true);
      expect(itemMenuDB[0].id).toBeDefined();
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.post(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB);
      expect(items).toHaveLength(1);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB);
    });
  });
  test('Adicionar um item com categoria inválida ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      itemMenuDB = await mockMenuRepository.getItems();
      if (itemMenuDB.length > 0) {
        await mockMenuRepository.delete(el => el.active);
        itemMenuDB = await mockMenuRepository.getItems();
      }
      expect(itemMenuDB).toHaveLength(0);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.post(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB);
      expect(items).toHaveLength(0);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB);
    });
  });
  test('Atualizar um item com categoria inválida', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table) => {
      const items = table.hashes();
      const alreadyExists = await mockMenuRepository.findOne((el) => el.name === items[0].name);
      if (!alreadyExists) {
        await mockMenuRepository.createItem(items[0]);
      }
      itemMenuDB = await mockMenuRepository.getItems();
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(items[0].name);
      expect(itemMenuDB[0].price).toBe(Number(items[0].price));
      expect(itemMenuDB[0].categoryID).toBe(items[0].categoryID);
      expect(itemMenuDB[0].description).toBe(items[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(items[0].timeToPrepare);
      expect(itemMenuDB[0].active).toBe(true);
      expect(itemMenuDB[0].id).toBeDefined();
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const payload = JSON.parse(docString);
      response = await request.put(url).send(payload);
      expect(response.request.method).toBe(method);
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (itemName) => {
      const item = await mockMenuRepository.findOne((el) => el.name === itemName);
      const previousItem = itemMenuDB.find((el) => el.name === itemName);
      expect(item).toEqual(previousItem); 
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('o corpo da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.message).toEqual(expectedResponse);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table) => {
      const items = table.hashes();
      const menuItems = await mockMenuRepository.getItems();
      expect(menuItems.length).toBe(items.length);
      expect(menuItems).toEqual(itemMenuDB);
    });
  })
});

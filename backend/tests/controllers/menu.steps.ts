import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import MenuRepository from '../../src/repositories/menu.repository';
import ItemMenuEntity from '../../src/entities/item-menu.entity';
import formatParam, { formatNumberParam, formatPrice, formatUrl } from '../utils/formatParams';

const feature = loadFeature('tests/features/menu.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockMenuRepository: MenuRepository;
  let response: supertest.Response;
  let itemMenuDB: ItemMenuEntity[];
  let previousItem: ItemMenuEntity;

  beforeEach(async () => {
    mockMenuRepository = di.getRepository(MenuRepository);
    // Delete all data:
    await mockMenuRepository.delete(() => false);
    itemMenuDB = await mockMenuRepository.getItems()
  });

  test('Adicionar um novo item ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      expect(itemMenuDB.length).toEqual(0);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method: string, url, docString) => {
      const route = formatUrl(url)
      const payload = JSON.parse(docString);
      response = await request.post(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toEqual(table.length);
      table.forEach((item: ItemMenuEntity, index: number) => {
        expect(itemMenuDB[index].name).toEqual(item.name);
        expect(itemMenuDB[index].price).toEqual(formatPrice(item.price));
        expect(itemMenuDB[index].categoryID).toEqual(formatNumberParam(item.categoryID));
        expect(itemMenuDB[index].description).toEqual(item.description);
        expect(itemMenuDB[index].timeToPrepare).toEqual(item.timeToPrepare);
      });
    });
  });

  test('Atualizar um item do cardápio', ({
    given,
    and,
    when,
    then
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]);

      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);
      
      expect(itemMenuDB[0].id).toBeDefined();
      expect(itemMenuDB[0].createdAt).toBeDefined();

      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url, previousItem.id)
      const payload = JSON.parse(docString);
      response = await request.put(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toEqual(table.length);
      table.forEach((item: ItemMenuEntity, index: number) => {
        expect(itemMenuDB[index].name).toBe(item.name);
        expect(itemMenuDB[index].price).toBe(formatPrice(item.price));
        expect(itemMenuDB[index].categoryID).toBe(item.categoryID);
        expect(itemMenuDB[index].description).toBe(item.description);
        expect(itemMenuDB[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  });
  test('Remover um item do cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]);

      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);
      
      expect(itemMenuDB[0].id).toBeDefined();
      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição "(.*)" para o endpoint "(.*)"$/, async (method, url) => {
      const route = `/api/${url.replace(':id', previousItem.id)}`
      response = await request.delete(route).send();
      expect(response.request.method).toBe(method)
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      itemMenuDB = await mockMenuRepository.getItems();
      expect(itemMenuDB).toEqual([]);
      expect(itemMenuDB.length).toBe(table.length);
      expect(itemMenuDB[0]).toBeUndefined();
    });
  });
  test('Adicionar um item sem nome ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      expect(itemMenuDB.length).toEqual(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url)
      const payload = JSON.parse(docString);
      response = await request.post(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then('o item não é adicionado ao cardápio', async () => {
      expect(itemMenuDB).toHaveLength(0)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);
    });
  });
  test('Adicionar um item sem preço no cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      expect(itemMenuDB.length).toEqual(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url)
      const payload = JSON.parse(docString);
      response = await request.post(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB)
      expect(items.length).toBe(0);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);
    });
  });
  test('Atualizar um item com informações preço inválido', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]); 
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);

      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url, previousItem.id)
      const payload = JSON.parse(docString);
      response = await request.put(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (itemName) => {
      expect(itemMenuDB[0].name).toBe(formatParam(itemName));
      expect(itemMenuDB[0]).toEqual(previousItem)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);

      expect(previousItem).toEqual(itemMenuDB[0]);
      table.forEach((item: ItemMenuEntity, index: number) => {
        expect(itemMenuDB[index].name).toBe(item.name);
        expect(itemMenuDB[index].categoryID).toBe(item.categoryID);
        expect(itemMenuDB[index].description).toBe(item.description);
        expect(itemMenuDB[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  });
  test('Atualizar um item com informações preço negativo', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]); 
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);
      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url, previousItem.id)
      const payload = JSON.parse(docString);
      response = await request.put(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (itemName) => {
      expect(itemMenuDB[0].name).toBe(formatParam(itemName));
      expect(itemMenuDB[0]).toEqual(previousItem)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });
      
    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);
      expect(previousItem).toEqual(itemMenuDB[0]);
      table.forEach((item: ItemMenuEntity, index: number) => {
        expect(itemMenuDB[index].name).toBe(item.name);
        expect(itemMenuDB[index].categoryID).toBe(item.categoryID);
        expect(itemMenuDB[index].description).toBe(item.description);
        expect(itemMenuDB[index].timeToPrepare).toBe(item.timeToPrepare);
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
      expect(itemMenuDB.length).toEqual(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*)$/, async (method, url) => {
      const route = formatUrl(url, "0")
      response = await request.delete(route).send();
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o status code da resposta é (.*)$/, async (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);
    });
  });
  test('Tentar enviar nenhuma informação para adicionar um item', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      expect(itemMenuDB.length).toEqual(0)
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) sem payload:$/, async (method, url) => {
      const route = formatUrl(url)
      response = await request.post(route).send();
      expect(response.request.method).toBe(formatParam(method));
    });

    then('o item não é adicionado ao cardápio', async () => {
      expect(itemMenuDB).toHaveLength(0)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);
    });
  });
  test('Tentar enviar nenhuma informação para atualizar um item', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]); 
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);

      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) sem payload:$/, async (method, url) => {
      const route = formatUrl(url, previousItem.id)
      response = await request.put(route).send();
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (itemName) => {
      expect(itemMenuDB[0].name).toBe(formatParam(itemName));
      expect(itemMenuDB[0]).toEqual(previousItem)
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);

      expect(previousItem).toEqual(itemMenuDB[0]);
    });
  });
  test('Adicionar um item existente ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]);
      
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);
      
      expect(itemMenuDB[0].id).toBeDefined();

      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url)
      const payload = JSON.parse(docString);
      response = await request.post(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then('o item não é adicionado ao cardápio', async () => {
      const items = await mockMenuRepository.getItems();
      expect(items).toEqual(itemMenuDB);
      expect(items).toHaveLength(1);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB.length).toBe(table.length);
      expect(previousItem).toEqual(itemMenuDB[0]);

      table.forEach((item: ItemMenuEntity, index: number) => {
        expect(itemMenuDB[index].name).toBe(item.name);
        expect(itemMenuDB[index].categoryID).toBe(item.categoryID);
        expect(itemMenuDB[index].description).toBe(item.description);
        expect(itemMenuDB[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  });
  test('Adicionar um item com categoria inválida ao cardápio', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que não há itens registrados no Cardápio$/, async () => {
      expect(itemMenuDB.length).toEqual(0);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url)
      const payload = JSON.parse(docString);
      response = await request.post(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then('o item não é adicionado ao cardápio', async () => {
      expect(itemMenuDB).toHaveLength(0);
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(itemMenuDB).toHaveLength(table.length);
    });
  });
  test('Atualizar um item com categoria inválida', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^que há um item registrado no Cardápio com as informações:$/, async (table: ItemMenuEntity[]) => {
      await mockMenuRepository.createItem(table[0]);
      
      expect(itemMenuDB).toHaveLength(1);
      expect(itemMenuDB[0].name).toBe(table[0].name);
      expect(itemMenuDB[0].price).toEqual(table[0].price);
      expect(itemMenuDB[0].categoryID).toBe(table[0].categoryID);
      expect(itemMenuDB[0].description).toBe(table[0].description);
      expect(itemMenuDB[0].timeToPrepare).toBe(table[0].timeToPrepare);
      
      expect(itemMenuDB[0].id).toBeDefined();
      previousItem = itemMenuDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url, previousItem.id)
      const payload = JSON.parse(docString);
      response = await request.put(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o item (.*) não é atualizado no cardápio$/, async (itemName) => {
      expect(itemMenuDB[0].name).toBe(formatParam(itemName));
      expect(itemMenuDB[0]).toEqual(previousItem); 
    });

    and(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('a mensagem da resposta é:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^a lista de itens no Cardápio é:$/, async (table: ItemMenuEntity[]) => {
      expect(previousItem).toEqual(itemMenuDB[0]);
      table.forEach((item: ItemMenuEntity, index: number) => {
        expect(itemMenuDB[index].name).toBe(item.name);
        expect(itemMenuDB[index].categoryID).toBe(item.categoryID);
        expect(itemMenuDB[index].description).toBe(item.description);
        expect(itemMenuDB[index].timeToPrepare).toBe(item.timeToPrepare);
      });
    });
  })
});

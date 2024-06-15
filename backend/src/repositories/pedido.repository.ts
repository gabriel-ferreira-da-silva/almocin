import PedidoEntity from '../entities/pedido.entity';
import BaseRepository from './base.repository';

class PedidoRepository extends BaseRepository<PedidoEntity> {
  constructor() {
    super('pedido');
  }

  public async getPedidos(): Promise<PedidoEntity[]> {
    return await this.findAll();
  }

  public async getPedido(id: string): Promise<PedidoEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createPedido(data: PedidoEntity): Promise<PedidoEntity> {
    return await this.add(data);
  }

  public async updatePedido(
    id: string,
    data: PedidoEntity
  ): Promise<PedidoEntity | null> {
    return await this.update((pedido) => pedido.id === id, data);
  }

  public async deletePedido(id: string): Promise<void> {
    await this.delete((pedido) => pedido.id === id);
  }
}

export default PedidoRepository;

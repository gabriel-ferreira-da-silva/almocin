import { Request, Response, Router } from 'express';
import StatsService from '../services/stats.service';
import { SuccessResult } from '../utils/result';
import { StatsFilter } from '../types/stats';
import authMiddleware from '../core/authentication';

class StatsController {
  private prefix: string = '/stats';
  public router: Router;
  private statsService: StatsService;

  constructor(
    router: Router,
    statsService: StatsService
  ) {
    this.router = router;
    this.statsService = statsService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(authMiddleware);
    this.router.get(`${this.prefix}/:filter`, (req: Request, res: Response) => 
      this.getStats(req, res)
    );
  }

  private async getStats(req: Request, res: Response) {
    const filter = req.params.filter as StatsFilter || StatsFilter.ALL;
    const stats = await this.statsService.getStats(filter);
    
    return new SuccessResult({
      msg: 'Stats found',
      data: stats
    }).handle(res);
  }
}

export default StatsController;

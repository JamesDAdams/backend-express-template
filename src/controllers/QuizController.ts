import { JsonController, Post, Get, Authorized, Body, Req, QueryParams } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { QuizService } from '../services/QuizService';
import { CreateQuizDto, PaginationQueryDto } from '../interfaces/quiz.interface';

@JsonController('/quiz')
export class QuizController {
	private readonly quizService: QuizService;

	constructor() {
		this.quizService = new QuizService();
	}

	@Post('/create')
	@Authorized()
	@OpenAPI({
		summary: 'Create a new quiz',
		description: 'Create a new quiz for the current user',
	})
	async createQuiz(@Body() data: CreateQuizDto, @Req() request: any) {
		return this.quizService.createQuiz(request.user.id, data);
	}

	@Get('/list')
	@Authorized()
	@OpenAPI({
		summary: 'Get user quizzes',
		description: 'Get paginated list of quizzes for the current user',
		responses: {
			'200': {
				description: 'List of user quizzes'
			}
		}
	})
	async getUserQuizzes(@QueryParams() query: PaginationQueryDto, @Req() request: any) {
		return this.quizService.getUserQuizzes(request.user.id, query.page, query.limit, query.orderBy);
	}
}
